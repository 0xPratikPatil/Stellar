import pygame
from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GLU import *
import serial
import math

# Initialize serial communication
ser = serial.Serial('COM3', 115200)  # Adjust COM port as needed

def create_cylinder_vertices(radius, height, segments):
    """Create vertices for a cylinder with given radius, height, and number of segments"""
    vertices = []
    for i in range(segments):
        angle = (2 * math.pi * i) / segments
        x = radius * math.cos(angle)
        z = radius * math.sin(angle)
        # Top vertex
        vertices.append([x, height/2, z])
        # Bottom vertex
        vertices.append([x, -height/2, z])
    return vertices

# Parameters for more realistic missile proportions
SEGMENTS = 24  # More segments for smoother cylinder
BODY_LENGTH = 8.0
BODY_RADIUS = 0.4
NOSE_LENGTH = 2.0
FIN_LENGTH = 1.2
FIN_WIDTH = 0.8

# Create main body vertices
body_vertices = create_cylinder_vertices(BODY_RADIUS, BODY_LENGTH, SEGMENTS)

# Create vertices for a more realistic missile
vertices = [
    # Nose cone tip
    [0, BODY_LENGTH/2 + NOSE_LENGTH, 0],  # 0: Sharp tip
    
    # Nose cone base (circular)
    *[[BODY_RADIUS * math.cos(2 * math.pi * i / SEGMENTS), 
       BODY_LENGTH/2, 
       BODY_RADIUS * math.sin(2 * math.pi * i / SEGMENTS)] 
      for i in range(SEGMENTS)],  # 1-24
    
    # Main body vertices
    *body_vertices,  # 25-72 (for 24 segments = 48 vertices)
    
    # Guidance fins (4 fins, more aerodynamic shape)
    # Each fin has 5 vertices for a swept-back design
]

# Add fin vertices
fin_angles = [0, 90, 180, 270]  # 4 fins at 90-degree intervals
fin_base_y = -BODY_LENGTH/2 + 0.2  # Slightly above bottom
fin_tip_y = fin_base_y + FIN_LENGTH

for angle in fin_angles:
    angle_rad = math.radians(angle)
    sin_a = math.sin(angle_rad)
    cos_a = math.cos(angle_rad)
    
    # Base vertices
    vertices.append([BODY_RADIUS * cos_a, fin_base_y, BODY_RADIUS * sin_a])  # Root front
    vertices.append([BODY_RADIUS * cos_a, fin_base_y - 1, BODY_RADIUS * sin_a])  # Root back
    # Tip vertex (swept back)
    vertices.append([(BODY_RADIUS + FIN_WIDTH) * cos_a, fin_tip_y - 0.8, (BODY_RADIUS + FIN_WIDTH) * sin_a])

# Define faces for more detailed missile
faces = {
    'nose_cone': [
        # Create triangular faces from tip to base
        *[(0, i, i+1) for i in range(1, SEGMENTS)],
        (0, SEGMENTS, 1),  # Close the cone
        # Base circle
        tuple(range(1, SEGMENTS + 1))
    ],
    'body': [
        # Body quads
        *[(i, i+1, i+3, i+2) for i in range(25, 71, 2)],
        (71, 25, 27, 73)  # Close the cylinder
    ],
    'fins': []
}

# Add faces for each fin
fin_base_idx = 73  # Starting index for fin vertices
for i in range(4):  # 4 fins
    offset = i * 3  # 3 vertices per fin
    faces['fins'].extend([
        (fin_base_idx + offset, fin_base_idx + offset + 1, fin_base_idx + offset + 2)  # Main fin triangle
    ])

# Material colors (military-style)
colors = {
    'nose_cone': (0.3, 0.3, 0.3),  # Dark gray
    'body': (0.4, 0.4, 0.4),       # Medium gray
    'fins': (0.2, 0.2, 0.2),       # Darker gray
    'details': (0.1, 0.1, 0.1)     # Almost black
}

def draw_missile_details():
    """Draw additional missile details"""
    glColor3f(0.2, 0.2, 0.2)
    
    # Draw panel lines
    glBegin(GL_LINES)
    for i in range(8):
        angle = (2 * math.pi * i) / 8
        x = BODY_RADIUS * 1.01 * math.cos(angle)
        z = BODY_RADIUS * 1.01 * math.sin(angle)
        glVertex3f(x, BODY_LENGTH/4, z)
        glVertex3f(x, -BODY_LENGTH/4, z)
    glEnd()
    
    # Draw warning stripes
    glBegin(GL_QUADS)
    stripe_count = 6
    stripe_height = BODY_LENGTH / (stripe_count * 2)
    for i in range(stripe_count):
        y = BODY_LENGTH/4 - i * stripe_height * 2
        if i % 2 == 0:
            glColor3f(0.8, 0.2, 0.0)  # Red
        else:
            glColor3f(0.9, 0.9, 0.9)  # White
        for angle in range(0, 360, 30):
            x1 = BODY_RADIUS * 1.01 * math.cos(math.radians(angle))
            z1 = BODY_RADIUS * 1.01 * math.sin(math.radians(angle))
            x2 = BODY_RADIUS * 1.01 * math.cos(math.radians(angle + 30))
            z2 = BODY_RADIUS * 1.01 * math.sin(math.radians(angle + 30))
            glVertex3f(x1, y, z1)
            glVertex3f(x2, y, z2)
            glVertex3f(x2, y - stripe_height, z2)
            glVertex3f(x1, y - stripe_height, z1)
    glEnd()

def draw_missile():
    """Draw the missile with all its components"""
    glEnable(GL_DEPTH_TEST)
    glEnable(GL_LIGHTING)
    glEnable(GL_LIGHT0)
    glEnable(GL_COLOR_MATERIAL)
    
    # Enhanced lighting for metallic appearance
    glLightfv(GL_LIGHT0, GL_POSITION, [5.0, 5.0, 5.0, 1.0])
    glLightfv(GL_LIGHT0, GL_AMBIENT, [0.3, 0.3, 0.3, 1.0])
    glLightfv(GL_LIGHT0, GL_DIFFUSE, [1.0, 1.0, 1.0, 1.0])
    glLightfv(GL_LIGHT0, GL_SPECULAR, [1.0, 1.0, 1.0, 1.0])
    
    # Material properties for metallic look
    glMaterialfv(GL_FRONT, GL_SPECULAR, [1.0, 1.0, 1.0, 1.0])
    glMaterialf(GL_FRONT, GL_SHININESS, 75.0)
    
    # Draw main components
    for part, part_faces in faces.items():
        glColor3fv(colors[part])
        for face in part_faces:
            if len(face) == 3:
                glBegin(GL_TRIANGLES)
            else:
                glBegin(GL_POLYGON)
            for vertex in face:
                # Calculate and set normal for better lighting
                if len(face) >= 3:
                    v1 = vertices[face[0]]
                    v2 = vertices[face[1]]
                    v3 = vertices[face[2]]
                    normal = [
                        (v2[1] - v1[1]) * (v3[2] - v1[2]) - (v2[2] - v1[2]) * (v3[1] - v1[1]),
                        (v2[2] - v1[2]) * (v3[0] - v1[0]) - (v2[0] - v1[0]) * (v3[2] - v1[2]),
                        (v2[0] - v1[0]) * (v3[1] - v1[1]) - (v2[1] - v1[1]) * (v3[0] - v1[0])
                    ]
                    length = math.sqrt(sum(x*x for x in normal))
                    if length != 0:
                        normal = [x/length for x in normal]
                        glNormal3fv(normal)
                
                glVertex3fv(vertices[vertex])
            glEnd()
    
    # Draw additional details
    draw_missile_details()

def draw_engine_effect():
    """Draw a more realistic engine exhaust effect"""
    glPushMatrix()
    glTranslatef(0, -BODY_LENGTH/2 - 0.2, 0)
    glDisable(GL_LIGHTING)
    glEnable(GL_BLEND)
    glBlendFunc(GL_SRC_ALPHA, GL_ONE)
    
    # Inner bright core
    glBegin(GL_TRIANGLE_FAN)
    glColor4f(1.0, 0.9, 0.3, 0.9)  # Bright yellow core
    glVertex3f(0, 0, 0)
    glColor4f(1.0, 0.5, 0.0, 0.0)  # Fade to transparent orange
    for angle in range(0, 361, 20):
        x = 0.2 * math.cos(math.radians(angle))
        z = 0.2 * math.sin(math.radians(angle))
        glVertex3f(x, -0.5, z)
    glEnd()
    
    # Outer flame effect
    glBegin(GL_TRIANGLE_FAN)
    glColor4f(1.0, 0.3, 0.0, 0.7)  # Orange center
    glVertex3f(0, -0.2, 0)
    glColor4f(0.7, 0.0, 0.0, 0.0)  # Fade to transparent red
    for angle in range(0, 361, 20):
        x = 0.4 * math.cos(math.radians(angle))
        z = 0.4 * math.sin(math.radians(angle))
        glVertex3f(x, -1.0, z)
    glEnd()
    
    glDisable(GL_BLEND)
    glEnable(GL_LIGHTING)
    glPopMatrix()

def main():
    pygame.init()
    display = (1024, 768)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
    pygame.display.set_caption("Realistic Missile Visualization")
    
    # Set up the view
    gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)
    glTranslatef(0.0, 0.0, -12)
    
    # Initial rotation values
    pitch, roll, yaw = 0, 0, 0
    
    clock = pygame.time.Clock()
    
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return
        
        # Read orientation data from ESP32
        if ser.in_waiting:
            try:
                data = ser.readline().decode('utf-8').strip()
                pitch, roll, yaw = map(float, data.split(','))
            except (ValueError, UnicodeDecodeError):
                pass
        
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        glPushMatrix()
        
        # Apply rotations based on sensor data
        glRotatef(pitch, 1, 0, 0)
        glRotatef(roll, 0, 1, 0)
        glRotatef(yaw, 0, 0, 1)
        
        # Draw missile and effects
        draw_missile()
        draw_engine_effect()
        
        glPopMatrix()
        pygame.display.flip()
        clock.tick(60)

if __name__ == "__main__":
    main()
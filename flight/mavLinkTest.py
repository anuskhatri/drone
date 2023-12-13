from dronekit import connect, VehicleMode
import time

# Set the connection string to the USB port where Pixhawk is connected.
# For Windows, the port should be in the format 'COMx', where x is the port number.
connection_string = 'COM13'

# Connect to the vehicle.
vehicle = connect(connection_string, baud=57600, wait_ready=True)

def send_signal_to_channel_6(value):
    # Ensure the value is within the valid range (1000 to 2000)
    value = max(1000, min(2000, value))

    # Set the value for Channel 6
    vehicle.channels.overrides['6'] = value

    
# Function to print vehicle information.
def print_vehicle_info():
    print("Autopilot Firmware version: %s" % vehicle.version)
    print("Autopilot capabilities (supports ftp): %s" % vehicle.capabilities.ftp)
    print("Global Location: %s" % vehicle.location.global_frame)
    print("Global Location (relative altitude): %s" % vehicle.location.global_relative_frame)
    print("Local Location: %s" % vehicle.location.local_frame)
    print("Attitude: %s" % vehicle.attitude)
    print("Velocity: %s" % vehicle.velocity)
    print("GPS: %s" % vehicle.gps_0)
    print("Groundspeed: %s" % vehicle.groundspeed)
    print("Airspeed: %s" % vehicle.airspeed)
    print("Battery: %s" % vehicle.battery)
    print("Mode: %s" % vehicle.mode.name)
    print("Armed: %s" % vehicle.armed)

# Print vehicle information.
print_vehicle_info()

# Change vehicle mode to GUIDED
vehicle.mode = VehicleMode("GUIDED")

# Arm the vehicle
vehicle.armed = True

# Wait for the vehicle to arm
while not vehicle.armed:
    print("Waiting for arming...")
    time.sleep(1)

# Send a signal to Channel 6 (set servo motor position)
channel_6_value = 2000  # Adjust this value based on your servo motor's range
send_signal_to_channel_6(channel_6_value)

print("Vehicle armed!")

# Print updated vehicle information.
print_vehicle_info()

# Close the vehicle connection
vehicle.close()

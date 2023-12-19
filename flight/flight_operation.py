from dronekit import connect, VehicleMode
import time

connection_string = 'COM5'
vehicle = connect(connection_string, baud=57600, wait_ready=False)

def drop_package(value):
    # Ensure the value is within the valid range (1000 to 2000)
    value = max(1000, min(2000, value))

    # Set the value for Channel 6
    vehicle.channels.overrides['6'] = value

def print_vehicle_info():
    data = [vehicle.location.global_frame, vehicle.location.global_relative_frame, vehicle.location.local_frame,
            vehicle.attitude, vehicle.velocity, vehicle.groundspeed, vehicle.airspeed, vehicle.battery,
            vehicle.mode.name, vehicle.armed]
    return data

def arming():
    # Arm the vehicle
    vehicle.armed = True

    # Wait for the vehicle to arm
    while not vehicle.armed:
        print("Waiting for arming...")
        time.sleep(1)

    print("Vehicle armed!")
# arming()
def disarming():
    # Disarm the vehicle
    vehicle.armed = False

    # Wait for the vehicle to disarm
    while vehicle.armed:
        print("Waiting for disarming...")
        time.sleep(1)

    print("Vehicle disarmed!")

# Arm the vehicle

# arming()

# Send a signal to Channel 6 (set servo motor position)

# channel_6_value = 2000  # Adjust this value based on your servo motor's range
# drop_package(channel_6_value)

# Print updated vehicle information.

print(print_vehicle_info())

# Disarm the vehicle

# disarming()

# Close the vehicle connection
def disconnect_to_vehicle():
    vehicle.close()
    
def set_mode(mode="LAND"):
    # Set the vehicle mode
    vehicle.mode = VehicleMode(mode)

    # Wait for the vehicle to change mode
    while vehicle.mode.name != mode:
        print(f"Waiting for mode change to {mode}...")
        time.sleep(1)

    print(f"Vehicle mode changed to {mode}!")
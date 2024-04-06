from dronekit import connect, VehicleMode
import time
from CTkMessagebox import CTkMessagebox 

class Error_pop_up:
    def connection_error(self, error_name):
        self.msg=ctkmessagebox = CTkMessagebox( title='Error', message=f'Error connecting: {error_name}', fade_in_duration=0, option_1="OK")
        ctkmessagebox.after(10000, ctkmessagebox.button_event)

        if self.msg.get()=='Cancel':
            return False

class DroneController:
    connected = False
    def __init__(self, connection_string='COM13', baud=57600, wait_ready=False):
        self.error_pop_up = Error_pop_up()
        try:
            print("working 1")
            self.vehicle = connect(connection_string, baud=baud, wait_ready=wait_ready)
            self.connected = True
        except Exception as e:
            print(type(e))
            print(f"Connection failed: {e}")
            self.connected = False
            self.error_pop_up.connection_error(connection_string)
        
    def drop_package(self):
        if not self.connected:
            print("Not connected to the vehicle.")

        else:

        # Ensure the value is within the valid range (1000 to 2000)
           

        # Set the value for Channel 6
            self.vehicle.channels.overrides['6'] = 1000

    def print_vehicle_info(self):
        if not self.connected:
            print("Not connected to the vehicle.")
            return None
        data = [
            self.vehicle.location.global_relative_frame.alt,
            self.vehicle.groundspeed,
            self.vehicle.velocity,
            self.vehicle.airspeed,
            self.vehicle.attitude.yaw,
            self.vehicle.velocity,
            self.vehicle.battery.voltage,
            self.vehicle.rangefinder.distance,
            ]
        return data

    def arming(self):
        if not self.connected:
            print("Not connected to the vehicle.")
            return

        # Arm the vehicle
        self.vehicle.armed = True

        # Wait for the vehicle to arm
        while not self.vehicle.armed:
            print("Waiting for arming...")
            time.sleep(1)

        print("Vehicle armed!")

    def disarming(self):
        if not self.connected:
            print(self.connected)
            print("Not connected to the vehicle.")
            return

        # Disarm the vehicle
        self.vehicle.armed = False

        # Wait for the vehicle to disarm
        while self.vehicle.armed:
            print("Waiting for disarming...")
            time.sleep(1)

        print("Vehicle disarmed!")

    def disconnect_from_vehicle(self):
        print("working  2")
        if not self.connected:
            print("Not connected to the vehicle.")
            return

        self.vehicle.close()
        print("Disconnected from the vehicle.")
    
    def set_mode(self, mode="LAND"):
        if not self.connected:
            print("Not connected to the vehicle.")
            return

        # Set the vehicle mode
        self.vehicle.mode = VehicleMode(mode)

        # Wait for the vehicle to change mode
        while self.vehicle.mode.name != mode:
            print(f"Waiting for mode change to {mode}...")
            time.sleep(1)

        print(f"Vehicle mode changed to {mode}!")

# Example usage in another file:

#     drone_controller.arming()
#     drone_controller.drop_package(1500)
#     print(drone_controller.print_vehicle_info())
#     drone_controller.set_mode("RTL")
#     drone_controller.disarming()
#     drone_controller.disconnect_from_vehicle()

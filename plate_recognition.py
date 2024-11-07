import sys
import cv2

def recognize_plate(image_path):

  return "ABC1234" or "ABC1D23"

if __name__ == "__main__":
  image_path = sys.argv[1]
  plate_number = recognize_plate(image_path)
  print(plate_number)
  

print(cv2.__version__)
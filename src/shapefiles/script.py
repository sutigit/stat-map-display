import argparse
import os

# Create the parser
parser = argparse.ArgumentParser(description="A script to copy shapefiles from source to destination using tags.")

# Define arguments
parser.add_argument('-s', type=str, required=True, help="Source directory of the shapefiles")
parser.add_argument('-d', type=str, required=True, help="Destination directory of the shapefiles")
parser.add_argument('-t', type=str, required=True, help="Substring to filter the shapefiles")
parser.add_argument('-a', type=int, nargs='+', help="Map accuracies")

# Parse the arguments
args = parser.parse_args()

# Access arguments
source = args.s
destination = args.d
tag = args.t
accuracies = args.a

for acc in accuracies:
    print('Accuracy:', acc)
    
    for dirc in os.listdir(source):
        if (f"{acc}k" in dirc):
            print('From directory:', dirc)
            
            for item in os.listdir(os.path.join(source, dirc)):
                
                if (tag in item and f"{acc}k.shp" in item):
                    print('Copy item:', item)
                    print('To directory:', os.path.join(destination, f'{acc}k'))
                    print('')
                    
                    # Copy the file
                    os.system(f"cp {os.path.join(source, dirc, item)} {os.path.join(destination, f'{acc}k')}")
                    
                


# ArcPy script for exporting 82 slices of the watershed stream network

# So, it turns out that animating all these lines is much more memory-intensive than I anticipated.
# As a bit of a hack, I decided to slice the stream network into a bunch of "frames";
# these frames can then be animated by quickly drawing each frame in succession, in a loop.

# The DEM (0m - 2150m) was reclassified to 25-meter increments numbered 1-82, with "1" being the highest
# (This is because I want to animate the stream network flowing downwards).
# The DEM was then converted from raster to shapefile in orther to perform a spatial join with the stream network polylines.
# The spatial join added whichever elevation class a stream segment was most contained by to its attribute table.

# I wanted to try and do this with JS, so I figured GeoJSON is the best output format. I was half right.
# It turns out that parsing through 17,000+ stream segments is very clunky.
# Which brings us to this. 

# Boilerplate stuff. ArcPy, function, saving myself from accidentally overwriting anything
import arcpy
def exportgeojsons():
    arcpy.env.overwriteOutput = False

    # The stream network with spatially joined elevation classes (1-82)
    WATERSHEDS_25m = "WATERSHEDS_25m"

    # Iterating through the values in "ID" field for 1) Slicing stream network into 82 elevation classes, and 2) Naming the output files
    for Value in (WATERSHEDS_25m, "Id", "GPString", True, True, "0"):

        # Creating a layer out of each value in the "ID" field
        WATERSHEDS_25m_Layer = "WATERSHEDS_25m_Layer"
        arcpy.management.MakeFeatureLayer(in_features=WATERSHEDS_25m, 
            out_layer=WATERSHEDS_25m_Layer, 
            where_clause=f"Id = {Value}")

        # Saving each feature as a geoJSON projected to WGS 84
        Value = "82"
        _Value_json = fr"C:\Users\cwitt\Desktop\GEOS 472 Cartography Research\Vancouver Water\GeoJSONs\stream_geojsons\{Value}.geojson"
        arcpy.conversion.FeaturesToJSON(in_features=WATERSHEDS_25m_Layer, 
            out_json_file=_Value_json, 
            geoJSON="GEOJSON", 
            outputToWGS84="WGS84")

# More boilerplate
if __name__ == '__main__':
    with arcpy.EnvManager(scratchWorkspace="C:\\Users\\cwitt\\Documents\\ArcGIS\\Projects\\Vancouver\\Vancouver.gdb", 
    workspace="C:\\Users\\cwitt\\Documents\\ArcGIS\\Projects\\Vancouver\\Vancouver.gdb"):
        exportgeojsons()

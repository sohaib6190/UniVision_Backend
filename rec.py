import sys
import pandas as pd
import json
from sklearn.cluster import KMeans

def recommend_courses(previous_grade, max_fee, level, tags, data):
    # Filter courses based on previous grade, max fee, level, and tags
    filtered_data = data[(data['Grade'] <= previous_grade) &
                         (data['Fee'] <= max_fee) &
                         (data['Level'] == level) &
                         (data['Tag'].isin(tags))]

    # Features for clustering
    features = filtered_data[['Fee', 'Rating', 'Grade']]

    # Determine the number of clusters dynamically
    unique_clusters = len(filtered_data['Course Name'].unique())

    # Apply K-means clustering
    kmeans = KMeans(n_clusters=unique_clusters)  # Set n_clusters to the number of unique clusters
    cluster_labels = kmeans.fit_predict(features)

    # Assign cluster labels to filtered data using .loc
    filtered_data.loc[:, 'Cluster'] = cluster_labels

    recommendations = []
    for cluster_id in filtered_data['Cluster'].unique():
        cluster_data = filtered_data[filtered_data['Cluster'] == cluster_id]
        recommended_course = cluster_data['Course Name'].iloc[0]
        recommended_university = cluster_data['University Name'].iloc[0]
        recommended_fee = cluster_data['Fee'].iloc[0]
        recommended_grade = cluster_data['Grade'].iloc[0]
        recommended_level = cluster_data['Level'].iloc[0]
        recommendations.append({
            'Recommended Course': recommended_course,
            'Recommended University': recommended_university,
            'Fee': recommended_fee,
            'Grade': recommended_grade,
            'Level': recommended_level
        })

    return recommendations

# Read data into pandas DataFrame
data = pd.read_csv('finaldata.csv')

# Command-line arguments
previous_grade = float(sys.argv[1])
max_fee = float(sys.argv[2])
level = sys.argv[3]
tags = sys.argv[4:]

# Get recommendations
recommendations = recommend_courses(previous_grade, max_fee, level, tags, data)

# Print recommendations in JSON format
print(json.dumps(recommendations, indent=4))


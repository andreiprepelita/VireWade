# The Mergebackers Team
#project #infoiasi #wade #web
# Vire (Vinyl Recommender Tool) 

**Final Deliverables Solution S**:

## Quick Access to Scholarly HTML Report / Open API Services / Diagrams / DataModeling / Code / UserGuide / Our endpoints

1. [Schorlarly HTML Report](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Final%20Deliverables%20Solution%20S/Scholarly%20HTML%20technical%20report/Vire%20Scholarly%20HTML%20technical%20report.html#playlist_based_recommendation)
2. [UserService API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Midterm%20Deliverable%20Design%20%26%20Architecture%20A/Open%20API%20SPECIFICATION/User%20Service%20-%20Open%20API/index.html)
3. [RecommendationService API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Midterm%20Deliverable%20Design%20%26%20Architecture%20A/Open%20API%20SPECIFICATION/Recommendation%20Service%20-%20Open%20API/index.html)
4. [Playlist API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Midterm%20Deliverable%20Design%20%26%20Architecture%20A/Open%20API%20SPECIFICATION/Playlist%20Service%20-%20Open%20API/index.html)
5. [Diagrams](https://github.com/andreiprepelita/VireWade/tree/main/Final%20Deliverables%20Solution%20S/Diagrams)

 

**Midterm Deliverable Design & Architecture A**:

## Quick Access to Scholarly HTML Report / Open API Services / Diagrams
1. [Schorlarly HTML Report](https://andreiprepelita.github.io/Tehnical-Report-Vire-Midterm-evaluation/)
2. [UserService API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Midterm%20Deliverable%20Design%20%26%20Architecture%20A/Open%20API%20SPECIFICATION/User%20Service%20-%20Open%20API/index.html)
3. [RecommendationService API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Midterm%20Deliverable%20Design%20%26%20Architecture%20A/Open%20API%20SPECIFICATION/Recommendation%20Service%20-%20Open%20API/index.html)
4. [Playlist API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Midterm%20Deliverable%20Design%20%26%20Architecture%20A/Open%20API%20SPECIFICATION/Playlist%20Service%20-%20Open%20API/index.html)
5. [Diagrams](https://github.com/andreiprepelita/VireWade/tree/main/Midterm%20Deliverable%20Design%20%26%20Architecture%20A/Diagrams)

Project progress

Week 6

-Establishing the high-level structure and flow of the APIs. (together)

-Discussing about Topic, Database structure and Diagram structure. (together)

Week 7

-High Level Architecture (Andrei)

-Use-case Diagrams. (Andrei)

-Describe the Vinyl Diagram. (Andrei)

Week 8

-OpenAPI specification.(User and Playlist Service) (Andrei)

-OpenAPI specification (Recommendation Service) (Eduard)

-Database Architecture (Eduard)

-Frontend design (Eduard)

-ScholarlyHTML. (Andrei)

Week 9

-Finalisation of the ScholarlyHTML document from this point. (Eduard)

-Finalisation of the OpenAPI Specification from this point. (Andrei)

**Build a (micro-)service Web system** able to **"intelligently" recommend vinyl music records** by exposing a **SPARQL endpoint**. The system tailors recommendations based on various criteria:

- **User Preferences:** Specified via controlled natural language constructs. 
  - Examples include preferences for classical music (like opera by Rossini or Verdi), progressive rock, post-rock, and specific dislikes such as rap and hip-hop.
- **Past Song Purchases:** Analyzing user's purchase history from various music stores.
- **Playlists Availability:** Incorporating playlists from online music streaming services (e.g., **Last.fm**) and local sources (e.g., uploading a JSPF/XSPF document).
- **Social Network Integration:** Considering playlists created or shared by the user's virtual "friends" on at least one social network.

The system leverages **several music-related knowledge models** (such as **Music Ontology** or **MusicRecording** concept from schema.org) and utilizes **public resources** like **Discogs**, **MusicBrainz**, and **Musicmoz Music Styles** for comprehensive music data and recommendations.


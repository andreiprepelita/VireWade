# The Mergebackers Team
#project #infoiasi #wade #web
# Vire (Vinyl Recommender Tool) 

**Final Deliverables Solution S**:

## Quick Access to Scholarly HTML Report / Open API Services / Diagrams / DataModeling / Code / UserGuide / Our endpoints

1. [Schorlarly HTML Report](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Final%20Deliverables%20Solution%20S/Scholarly%20HTML%20technical%20report/Vire%20Scholarly%20HTML%20technical%20report.html)
2. [UserService API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade//blob/main/Final%20Deliverables%20Solution%20S/Open%20API%20Specification/Users%20%26%20Playlist%20Modules%20-%20Spotify%20%26%20Local%20Endpoint%20Opn%20API/index.html)
3. [RecommendationService API](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Final%20Deliverables%20Solution%20S/Open%20API%20Specification/Recommendation%20Module%20-%20Open%20API/index.html)
4. [Diagrams](https://github.com/andreiprepelita/VireWade/tree/main/Final%20Deliverables%20Solution%20S/Diagrams)
5. [DataModeling](https://github.com/andreiprepelita/VireWade/tree/main/Final%20Deliverables%20Solution%20S/DataModeling)
6. [Code](https://github.com/andreiprepelita/VireWade/tree/main/Final%20Deliverables%20Solution%20S/Code)
7. [UserGuide](https://htmlpreview.github.io/?https://github.com/andreiprepelita/VireWade/blob/main/Final%20Deliverables%20Solution%20S/UserGuide/userGuide.html)
8. [SparqlEndpoint](https://sparql-endpoint.onrender.com/sparqlRecommendation)
9. [Recommendation Service](https://recommendation-api-0q3l.onrender.com/recommendation)
10. [User Service](https://virewade-node-backend.onrender.com)
11. [UI App](https://vinyl-frontend.onrender.com)

**Project progress**

Week 10
- Andrei initiated the Sparql Endpoint implementation, integrating Stardog, and creating the database.
- Eduard embarked on frontend development.

Week 11
- Andrei finalized the Sparql Endpoint and began developing the Recommendation API, focusing on user option criteria.
- Eduard modeled playlist data and continued frontend development.

Week 12
- Andrei advanced the Recommendation API development, incorporating discogs integration.
- Eduard commenced integration with the Spotify API.

Week 13
- Andrei progressed with the Recommendation API, adding logic for local playlists.
- Eduard developed playlist logic using Spotify data.

Week 14
- Andrei completed the Recommendation API implementation and iniatied the Playlist local recommendation feature.
- Eduard finalized the playlist logic based on Spotify data.

Week 15
- Andrei finalized the playlist local logic, started the Scholarly HTML technical report, refactored initial diagrams, updated the Open API for the Recommendation API.
- Eduard completed the UI, began integration with the Recommendation API, and refactored the Open API for User and Playlist Service.

Week 16
- Andrei wrapped up his section of the Scholarly technical report, initiated the deployment of the Sparql Endpoint and Recommendation API on the Render Platform, and finalized the User Guide Scholarly HTML Report.
- Eduard finished integrating with the Recommendation API, addressed frontend bugs, completed his section of the Scholarly HTML technical report, and created the User Guide video.





 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------


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


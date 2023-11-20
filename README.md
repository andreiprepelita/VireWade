# Vire (Vinyl Recommender Tool) #The Mergebackers Team

**Build a (micro-)service Web system** able to **"intelligently" recommend vinyl music records** by exposing a **SPARQL endpoint**. The system tailors recommendations based on various criteria:

- **User Preferences:** Specified via controlled natural language constructs. 
  - Examples include preferences for classical music (like opera by Rossini or Verdi), progressive rock, post-rock, and specific dislikes such as rap and hip-hop.
- **Past Song Purchases:** Analyzing user's purchase history from various music stores.
- **Playlists Availability:** Incorporating playlists from online music streaming services (e.g., **Last.fm**) and local sources (e.g., uploading a JSPF/XSPF document).
- **Social Network Integration:** Considering playlists created or shared by the user's virtual "friends" on at least one social network.

The system leverages **several music-related knowledge models** (such as **Music Ontology** or **MusicRecording** concept from schema.org) and utilizes **public resources** like **Discogs**, **MusicBrainz**, and **Musicmoz Music Styles** for comprehensive music data and recommendations.


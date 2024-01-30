package org.example.RecommendationAPI.services;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaylistService {

    public static Document processDocumentInByteFormat(byte[] fileContent) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        ByteArrayInputStream input = new ByteArrayInputStream(fileContent);

        return (Document) builder.parse(input);
    }

    public static List<String> getArtist(Document doc) {
        // Extracting artists from tracks
        List<String> artists = new ArrayList<>();
        NodeList trackNodes = doc.getElementsByTagName("track");
        for (int i = 0; i < trackNodes.getLength(); i++) {
            Element track = (Element) trackNodes.item(i);
            String creator = track.getElementsByTagName("creator").item(0).getTextContent();
            artists.add(creator);
        }

        return artists.stream()
                .distinct()
                .collect(Collectors.toList());
    }

    public static List<String> getGenres(Document doc) {
        List<String> genres = new ArrayList<>();
        // Extracting the genre from the playlist
        NodeList genreNodes = doc.getElementsByTagName("genre");
        for (int i = 0; i < genreNodes.getLength(); i++) {
            genres.add(genreNodes.item(i).getTextContent().toLowerCase());
        }
        return genres.stream()
                .distinct()
                .collect(Collectors.toList());
    }
}

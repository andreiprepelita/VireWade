import React, { useState, useEffect } from "react";
import { Stack, Spinner, FormControl, FormLabel, CheckboxGroup, Checkbox, FormHelperText, Text } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";


const GenreForm = ({setChecked, labelText, helperText, colorScheme}) => {
    const pageSize = 5;
    const genreLimit = 50;
    const countURL = "https://recommendation-api-0q3l.onrender.com/recommendation/top";
    var genreStructuredData = {};
    const [hasError, setErrors] = useState(false);

    const [genres, setGenres] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [checkedGenres, setCheckedGenres] = useState([]);

    useEffect(() => {
        fetchGenres(pageIndex);

        if (pageIndex*pageSize >= genreLimit) {
            setShowRightArrow(false);
        } else if (showRightArrow === false) {
            setShowRightArrow(true);
        }

        if (pageIndex <= 1) {
            setShowLeftArrow(false);
        } else if (showLeftArrow === false) {
            setShowLeftArrow(true);
        }

    }, [pageIndex]);

    useEffect(() => {
        setChecked(checkedGenres);
    }, [checkedGenres])

    const getRightArrows = () => {
        return ( 
            <IoIosArrowForward
                className="leftArrowSimple"
                size="20px"
                color={"teal"}
                onClick={async () => {setPageIndex(pageIndex + 1);}}
            />
        )
    }

    const getLeftArrows = () => {
        return (
            <IoIosArrowBack
                className="leftArrowSimple"
                size="20px"
                color={"teal"}
                onClick={() => {setPageIndex(pageIndex - 1);}}
            />
        )
    }

    const getGenreStructuredData = (genreName, genreId) => {
        genreStructuredData = {
            "@context": {
                "mo": "http://purl.org/ontology/mo/",
                "dc": "http://purl.org/dc/elements/1.1/",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#"
              },
                "@type": "mo:genre",
                "rdfs:label": genreName,
                "@id": genreId
        }
        return genreStructuredData;
      };

    const fetchGenres = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fieldToRankBy": "genre",
                "limitQuery": genreLimit,
                "numberOfItemsPerPage" : pageSize,
                "pageNumber": pageIndex,
            })
        };

        setIsLoading(true);
        const res = await fetch(countURL, requestOptions);
        res.json()
            .then(res => {
                console.log(res)
                if(res.error) {
                    setErrors(true)
                } else {
                    setGenres(res.records)
                    setErrors(false);
                }})
            .then(res => setIsLoading(false))
            .catch(err => setErrors(true));

    }

    const updateCheckedGenres = (isChecked, value) => {
        let genreList = [...checkedGenres];
        if (isChecked) {
            genreList.push(value);
        } else {
            const index = genreList.indexOf(value);
            genreList.splice(index, 1);
        }
        setCheckedGenres(genreList);
    }

    if (hasError) {
        return (<Text fontSize='2xl' color='tomato'>An error has occured, please try again.</Text>)
    }

  

    return (     
    <FormControl as='fieldset' style={{textAlign:"center"}}>
        <FormLabel as='legend' mb={5} style={{textAlign:"center"}}>{labelText}</FormLabel>
        <CheckboxGroup colorScheme={colorScheme} size='lg' style={{textAlign:"center"}}>
            <Stack spacing={[1,5]} direction={['column', 'row']}>
            {isLoading ?
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='teal.500'
                size='xl'
            />
            : <div style={{margin: "0 auto"}}>
                {showLeftArrow ? getLeftArrows() : null}
               { genres.map(genre => {
                
                return ( 
                <div>
                    <script type="application/ld+json">
                {JSON.stringify(getGenreStructuredData(genre.genreLabel, genre.genre))}
                </script>
                    
                        <Checkbox 
                            value={genreStructuredData["rdfs:label"]} 
                            key={genreStructuredData["rdfs:label"]} 
                            onChange={(event) => {updateCheckedGenres(event.target.checked, event.target.value)}}>
                            {genreStructuredData["rdfs:label"]}
                            
                        </Checkbox>
                        </div>)
            }) 
            }
            {showRightArrow ? getRightArrows() : null}
            </div>
            }
            </Stack>
        </CheckboxGroup>
        <FormHelperText mt={5} mb={5}>{helperText}</FormHelperText>
    </FormControl> 
)
}

export default GenreForm;
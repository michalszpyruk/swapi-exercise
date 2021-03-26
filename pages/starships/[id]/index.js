import { Box, Flex, Heading, Text, Link, GridItem } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import DetailsText from '../../../components/DetailsText';

const defaultEndpoint = 'https://swapi.dev/api/starships';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}/${id}`);
  const data = await res.json();
  return {
    props: {
      data
    }
  };
}

const index = ({ data }) => {
  const [movieNames, setMovieNames] = useState([]);
  const [pilotNames, setPilotNames] = useState([]);

  const {
    name,
    crew,
    films,
    hyperdrive_rating,
    length,
    manufacturer,
    max_atmosphering_speed,
    model,
    passengers,
    pilots
  } = data;

  useEffect(() => {
    if (films.length > 0) {
      Promise.all(films.map((film) => fetch(film))).then((resp) =>
        Promise.all(resp.map((res) => res.json())).then((result) => {
          setMovieNames(result);
        })
      );
    }

    if (pilots.length > 0) {
      Promise.all(pilots.map((pilot) => fetch(pilot))).then((resp) =>
        Promise.all(resp.map((res) => res.json())).then((result) => {
          setPilotNames(result);
        })
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>SWAPI | {name}</title>
      </Head>

      <Flex width="100%" height="100%">
        <Flex p={2} mt={6} mx="auto" flexDirection="column" alignItems="center">
          <Heading py={4}>{name}</Heading>

          <Box>
            <DetailsText title="Max Speed:" value={max_atmosphering_speed} />
            <DetailsText title="Passengers:" value={passengers} />
            <DetailsText title="Crew:" value={crew} />
            <DetailsText title="Manufacturer:" value={manufacturer} />
            <DetailsText title="Model:" value={model} />
            <DetailsText title="Length:" value={length} />
            <DetailsText title="Rating:" value={hyperdrive_rating} />

            {pilots.length > 0 && (
              <Flex align="center" py={2}>
                <Text fontWeight="bold" mr={2}>
                  Pilots:
                </Text>

                <Flex wrap="wrap">
                  {pilotNames &&
                    pilotNames.map((pilot) => {
                      return (
                        <Tag m={1} variant="solid" colorScheme="yellow" key={pilot.url}>
                          {pilot.name}
                        </Tag>
                      );
                    })}
                </Flex>
              </Flex>
            )}

            {movieNames.length > 0 && (
              <Flex align="center" py={2}>
                <Text fontWeight="bold" mr={2}>
                  Films:
                </Text>

                <Flex wrap="wrap">
                  {movieNames &&
                    movieNames.map((movie) => {
                      return (
                        <Tag m={1} variant="solid" colorScheme="yellow" key={movie.url}>
                          {movie.title}
                        </Tag>
                      );
                    })}
                </Flex>
              </Flex>
            )}
          </Box>

          <NextLink href="/" passHref>
            <Link m={6}>&#8592; Go back</Link>
          </NextLink>
        </Flex>
      </Flex>
    </>
  );
};

export default index;

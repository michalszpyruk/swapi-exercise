import Head from 'next/head';
import { Box, Input, Flex, Heading, Button, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import StarshipsList from '../components/StarshipsList';
import FiltersList from '../components/FiltersList';

const starshipsEndpoint = 'https://swapi.dev/api/starships';
const filmsEndpoint = 'https://swapi.dev/api/films';

export async function getStaticProps() {
  const [starshipsRes, filmsRes] = await Promise.all([
    fetch(starshipsEndpoint),
    fetch(filmsEndpoint)
  ]);

  const [starshipsData, filmsData] = await Promise.all([starshipsRes.json(), filmsRes.json()]);

  return {
    props: {
      starshipsData,
      filmsData
    }
  };
}

export default function Home({ starshipsData, filmsData }) {
  const { previous, next, results: starshipsResults = [] } = starshipsData;

  const [filter, setFilter] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [starships, setStarships] = useState(starshipsResults);

  const [page, setPage] = useState({
    ...{ next, previous },
    current: starshipsEndpoint
  });

  const { current } = page;

  useEffect(() => {
    if (page === starshipsEndpoint) return;

    async function fetchMore() {
      const res = await fetch(current);
      const nextData = await res.json();

      setPage({
        current,
        ...nextData
      });

      if (!nextData.previous) {
        setStarships(nextData.results);
        return;
      }

      setStarships([...starships, ...nextData.results]);
    }

    fetchMore();
  }, [current]);

  const handleLoadMore = () =>
    setPage((prev) => ({
      ...prev,
      current: page?.next
    }));

  const handleTextChange = (event) => setSearchInput(event.target.value);

  const handleFilterMovie = (event) => setFilter(event.target.value);

  const filteredStarships = [...starships].filter((starship) => {
    if (filter) {
      return (
        starship.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        starship.films.includes(filter)
      );
    }

    return starship.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <>
      <Head>
        <title>SWAPI | Starships</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box width="100%" height="100%">
        <Flex flexDirection="column">
          <Flex justifyContent="flex-start" alignItems="center" flexDirection="column">
            <Heading py={6}>SWAPI - Task</Heading>
            <Input
              width="80%"
              size="lg"
              variant="outline"
              placeholder="Look for a starship..."
              value={searchInput}
              onChange={handleTextChange}
            />
            <FiltersList
              clearFilters={() => setFilter()}
              films={filmsData.results}
              handleFilter={handleFilterMovie}
              filter={filter}
            />
          </Flex>
          <StarshipsList starships={filteredStarships} />
          <Center py={6}>
            <Button isDisabled={!page.next} onClick={handleLoadMore} variant="solid" width="180px">
              Load more
            </Button>
          </Center>
        </Flex>
      </Box>
    </>
  );
}

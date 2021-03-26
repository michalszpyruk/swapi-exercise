import { Button } from '@chakra-ui/button';
import { Box, SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import NextLink from 'next/link';

const StarshipsList = ({ starships }) => {
  return (
    <SimpleGrid px={10} columns={{ sm: 1, md: 2 }} spacingX={10} spacingY={6}>
      {starships.map((starship) => {
        const { name } = starship;
        const id = starship.url.match(/\d+/)[0];

        return (
          <Box key={id}>
            <NextLink href="/starships/[id]" as={`/starships/${id}`} passHref>
              <Button as="a" variant="outline" width="100%">
                {name}
              </Button>
            </NextLink>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default StarshipsList;

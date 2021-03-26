import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';

const FiltersList = ({ clearFilters, films, handleFilter, filter }) => {
  return (
    <Flex mx={2} py={4} wrap="wrap" alignItems="center" justifyContent="center">
      <Button
        onClick={clearFilters}
        m={2}
        variant="solid"
        size="md"
        bg="red.400"
        _hover={{ bg: 'red.400' }}
      >
        Clear filters &#10005;
      </Button>
      {films.map((film) => {
        const { title, url } = film;
        return (
          <Button
            value={url}
            key={url}
            onClick={handleFilter}
            m={1}
            variant="solid"
            size="md"
            bg={url === filter ? 'green.400' : 'gray.600'}
            _hover={{ bg: url === filter ? 'green.400' : 'gray.700' }}
          >
            {title}
          </Button>
        );
      })}
    </Flex>
  );
};

export default FiltersList;

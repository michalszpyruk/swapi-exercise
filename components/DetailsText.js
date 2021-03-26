import { Flex, Text } from '@chakra-ui/layout';

const DetailsText = ({ title, value }) => {
  return (
    <Flex py={2}>
      <Text fontWeight="bold" mr={2}>
        {title}
      </Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export default DetailsText;

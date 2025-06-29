import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "./constants";
const languages = Object.entries(LANGUAGE_VERSIONS)

const Languageselector = ({language,onselect}) => {
    console.log(languages)
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="lg">Language Selector</Text>
      <Menu isLazy>
        <MenuButton as={Button}>
          {language}
        </MenuButton>
        <MenuList>
            {
                languages.map(([lang,version])=>(
                     <MenuItem key={lang} color={lang == language ?"blue.400":""} bg={lang==language?"gray.700":""} _hover={{color:"blue.400", bg:"gray.900"}} onClick={()=>onselect(lang)}>{lang}&nbsp;
                     <Text>{version}</Text>
                     </MenuItem>
                ))
            }
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Languageselector;

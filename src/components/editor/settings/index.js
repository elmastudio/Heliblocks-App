import React, { useReducer, useContext } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  FormControl,
  Textarea
} from "@chakra-ui/core";
import SelectTags from "./selectTags";
import { EditorContext } from "./../editorContext"

const Settings = ( props ) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { description, tags, setState } = useContext( EditorContext )

  const [innerState, setInnerState] = useReducer(
    (innerState, newInnerState) => ({ ...innerState, ...newInnerState }),
    { description, tags });

  const saveHandle = () => {
    onClose();
    setState(innerState);
  };
  return (
    <>
      <Button fontWeight="medium" onClick={onOpen} {...props}>
        Settings
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                ref={initialRef}
                value={innerState.description}
                onChange={e => setInnerState({ description: e.target.value })}
                placeholder="Add Description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tags</FormLabel>
              <SelectTags
                onChange={tags => setInnerState({ tags })}
                value={innerState.tags}
              />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" onClick={saveHandle}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;

Settings.propTypes = {
  ...Button.propTypes,
  tags: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  setProp: PropTypes.func,
};
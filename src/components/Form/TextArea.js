import React from 'react'
import { Box, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Textarea } from 'baseui/textarea'

const FormTextArea = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  error,
  touched
}) => (
  <FormControl pos='relative' pt={2} isInvalid={error && touched}>
    <Box
      bg='gray.200'
      border='2px solid #3c9130'
      borderBottomColor={error && touched ? 'red.500' : 'cf.400'}
      borderLeftWidth={0}
      borderRightWidth={0}
      borderTopWidth={0}
    >
      <FormLabel
        fontSize={{ md: 'sm' }}
        pos='absolute'
        left={{ md: 4 }}
        top={-1}
        color='gray.600'
      >
        {label}
      </FormLabel>
      <Textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        type='text'
        clearOnEscape
        overrides={{
          Root: {
            style: {
              backgroundColor: 'transparent',
              borderWidth: '0px'
            }
          },
          Input: {
            style: {
              backgroundColor: 'transparent',
              borderWidth: '0px'
            }
          },
          InputContainer: {
            style: {
              backgroundColor: 'transparent',
              borderWidth: '0px'
            }
          }
        }}
      />
    </Box>

    {error && touched && (
      <FormErrorMessage fontSize='xs'>{error}</FormErrorMessage>
    )}
  </FormControl>
)

FormTextArea.propTypes = {
  label: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  error: PropTypes.any,
  touched: PropTypes.any,
  onBlur: PropTypes.any.isRequired
}

export default FormTextArea

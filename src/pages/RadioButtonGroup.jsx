import { Box, Button, ButtonGroup, useId, useRadio, useRadioGroup } from '@chakra-ui/react'
import { Children, cloneElement, isValidElement, useMemo } from 'react'

export const RadioButtonGroup = (props) => {
  const { children, name, defaultValue, value, onChange, ...rest } = props
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  })
  const buttons = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map((button, index, array) => {
          const isFirstItem = index === 0
          const isLastItem = array.length === index + 1
          const styleProps = Object.assign({
            ...(isFirstItem && !isLastItem
              ? {
                  borderRightRadius: 0,
                }
              : {}),
            ...(!isFirstItem && isLastItem
              ? {
                  borderLeftRadius: 0,
                }
              : {}),
            ...(!isFirstItem && !isLastItem
              ? {
                  borderRadius: 0,
                }
              : {}),
            ...(!isLastItem
              ? {
                  mr: '-px',
                }
              : {}),
          })
          return cloneElement(button, {
            ...styleProps,
            radioProps: getRadioProps({
              value: button.props.value,
              disabled: props.isDisabled || button.props.isDisabled,
            }),
          })
        }),
    [children, getRadioProps, props.isDisabled],
  )
  return (
    <ButtonGroup isAttached variant="outline" {...getRootProps(rest)}>
      {buttons}
    </ButtonGroup>
  )
}
export const RadioButton = (props) => {
  const { radioProps, ...rest } = props
  const { getInputProps, getCheckboxProps, getLabelProps } = useRadio(radioProps)
  const id = useId(undefined, 'radio-button')
  const inputProps = getInputProps()
  const checkboxProps = getCheckboxProps()
  const labelProps = getLabelProps()
  return (
    <Box
      as="label"
      cursor="pointer"
      {...labelProps}
      sx={{
        '.focus-visible + [data-focus]': {
          boxShadow: 'outline',
          zIndex: 1,
        },
      }}
    >
      <input {...inputProps} aria-labelledby={id} />
      <Button
        id={id}
        as="div"
        _focus={{
          boxShadow: 'none',
        }}
        {...checkboxProps}
        {...rest}
      />
    </Box>
  )
}

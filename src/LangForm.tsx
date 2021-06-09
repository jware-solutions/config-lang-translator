import React from 'react'
import { DropdownItemProps, Form } from 'semantic-ui-react'
import { Lang, TranslatorState } from './Translator'

interface LangFormProps {
  /** Languages to display in Select. */
  langOptions: DropdownItemProps[],
  /** Name to set in Select input to handle changes. */
  selectedLangInputName: string,
  /** Selected language in Select input. */
  selectedLang: Lang,
  /** Name to set in TextArea to handle changes. */
  textInputName: string,
  /** Text to display in TextArea. */
  text: string,
  /** Form change callback. */
  handleFormChange: (name: keyof TranslatorState, value: string) => void
}

/**
 * Renders a form with Select and a TextArea.
 *
 * @param props - Component props.
 * @returns Component.
 */
export const LangForm = (props: LangFormProps) => {
  return (
    <Form>
      <Form.Select
      options={props.langOptions}
      name={props.selectedLangInputName}
      value={props.selectedLang}
      width={1}
      onChange={(_, { name, value }) => { props.handleFormChange(name, value as string) }}
      />
      <Form.TextArea
      rows={25}
      name={props.textInputName}
      value={props.text}
      onChange={(_, { name, value }) => { props.handleFormChange(name, value as string) }}
      />
    </Form>
  )
}

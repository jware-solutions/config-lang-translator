import React from 'react'
import { DropdownItemProps, Form, Grid, Icon, Select, TextArea } from 'semantic-ui-react'
// import { parse, dump } from 'gura'
// import yaml from 'js-yaml'

type Lang = 'json' | 'yaml' | 'gura' | 'toml'

interface TranslatorProps {
}

interface TranslatorState {
  origin: string,
  originLang: Lang,
  dest: string
  destLang: Lang
}

export class Translator extends React.Component<TranslatorProps, TranslatorState> {
  constructor (props: TranslatorProps) {
    super(props)

    this.state = {
      origin: '',
      originLang: 'yaml',
      dest: '',
      destLang: 'json'
    }
  }

  /**
   * Handles form changes.
   *
   * @param name - Name of the field to update.
   * @param value - Value to set as new field state.
   */
  handleFormChange (name: keyof TranslatorState, value: string) {
    // console.log(e)
    // console.log(value)
    // console.log(yaml.load(value))
    // const valueObject = yaml.load(value)
    // this.setState({ origin: value, dest: dump(valueObject) })
    // this.setState<never>({ [name]: value, dest: JSON.stringify(valueObject) })
    this.setState<never>({ [name]: value })
  }

  /**
   * Generates options array for Dropdown/Select.
   *
   * @returns Array of DropdownItemProps.
   */
  generateDropdownItems (): DropdownItemProps[] {
    return ['json', 'yaml', 'gura', 'toml'].map((lang) => {
      return { key: lang, value: lang, text: lang }
    })
  }

  /**
   * Toggles origin and dest languages.
   */
  toggleLangs = () => {
    this.setState((prevState) => {
      return { originLang: prevState.destLang, destLang: prevState.originLang }
    })
  }

  /**
   * Render method.
   *
   * @returns Component.
   */
  render () {
    const langOptions = this.generateDropdownItems()
    const destLangOptions = langOptions.filter((lang) => lang.value !== this.state.originLang)

    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={7}>
            <Form>
              <Form.Select
                options={langOptions}
                name='originLang'
                value={this.state.originLang}
                width={1}
                onChange={(_, { name, value }) => { this.handleFormChange(name, value as string) }}
              />
              <Form.TextArea
                name='origin'
                value={this.state.origin}
                onChange={(_, { name, value }) => { this.handleFormChange(name, value as string) }}
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={2}>
            <Icon
              name='exchange'
              className='clickable'
              onClick={this.toggleLangs}
              title='Toggle languages'
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Form>
              <Select options={destLangOptions} value={this.state.destLang}/>
              <TextArea readOnly value={this.state.dest} />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

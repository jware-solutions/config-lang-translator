import React from 'react'
import { DropdownItemProps, Grid, Icon } from 'semantic-ui-react'
import { parse, dump } from 'gura'
import yaml from 'js-yaml'
import toml from 'toml-js'
import { LangForm } from './LangForm'

type Lang = 'json' | 'yaml' | 'gura' | 'toml'

interface TranslatorProps {
}

interface TranslatorState {
  origin: string,
  originLang: Lang,
  dest: string
  destLang: Lang,
  parseError: string | null,
  dumpError: string | null
}

class Translator extends React.Component<TranslatorProps, TranslatorState> {
  constructor (props: TranslatorProps) {
    super(props)

    this.state = {
      origin: '',
      originLang: 'yaml',
      dest: '',
      destLang: 'gura',
      parseError: null,
      dumpError: null
    }
  }

  /**
   * Handles form changes.
   *
   * @param name - Name of the field to update.
   * @param value - Value to set as new field state.
   */
  handleFormChange = (name: keyof TranslatorState, value: string) => {
    if (
      (name === 'originLang' && value === this.state.destLang) ||
      (name === 'destLang' && value === this.state.originLang)
    ) {
      this.toggleLangs()
    } else {
      this.setState<never>({ [name]: value }, this.transpile)
    }
  }

  /**
   * Parses a text with the selected configuration language.
   *
   * @param text - Text to parse.
   * @returns Parsed data.
   */
  parse (text: string): object {
    let destValue: object
    switch (this.state.originLang) {
      case 'gura':
        destValue = parse(text)
        break
      case 'json':
        destValue = JSON.parse(text)
        break
      case 'yaml':
        destValue = yaml.load(text) as object
        break
      case 'toml':
        destValue = toml.parse(text)
        break
      default:
        destValue = {}
        break
    }

    return destValue
  }

  /**
   * Converts an object into an string with the selected configuration language.
   *
   * @param valueObject - Object to dump.
   * @returns String formatted.
   */
  dump (valueObject: object): string {
    let destValue: string
    switch (this.state.destLang) {
      case 'gura':
        destValue = dump(valueObject)
        break
      case 'json':
        destValue = JSON.stringify(valueObject, null, 2)
        break
      case 'yaml':
        destValue = yaml.dump(valueObject)
        break
      case 'toml':
        destValue = toml.dump(valueObject)
        break
      default:
        destValue = ''
        break
    }

    return destValue
  }

  /**
   * Parses the origin and dumps to dest.
   */
  transpile () {
    try {
      const valueObject = this.parse(this.state.origin)
      this.setState({ parseError: null })

      // Only dumps if there is at least one value
      if (Object.entries(valueObject).length > 0) {
        try {
          const destValue = this.dump(valueObject)
          this.setState({ dest: destValue })
        } catch (ex) {
          // Error dumping
          this.setState({ dumpError: ex.message })
        }
      }
    } catch (ex) {
      // Error parsing
      this.setState({ parseError: ex.message })
    }
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
      return {
        originLang: prevState.destLang,
        destLang: prevState.originLang,
        origin: prevState.dest,
        dest: ''
      }
    }, () => {
      this.transpile()
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
            <LangForm
              langOptions={langOptions}
              selectedLangInputName='originLang'
              selectedLang={this.state.originLang}
              textInputName='origin'
              text={this.state.origin}
              handleFormChange={this.handleFormChange}
            />
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
            <LangForm
              langOptions={destLangOptions}
              selectedLangInputName='destLang'
              selectedLang={this.state.destLang}
              textInputName='dest'
              text={this.state.dest}
              handleFormChange={this.handleFormChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export { Translator }
export type { Lang, TranslatorState }

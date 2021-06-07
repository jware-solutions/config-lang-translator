import React from 'react'
import { Form, Grid, TextArea } from 'semantic-ui-react'

interface TranslatorProps {
}

interface TranslatorState {
  origin: string,
}

export class Translator extends React.Component<TranslatorProps, TranslatorState> {
  constructor (props: TranslatorProps) {
    super(props)

    this.state = {
      origin: ''
    }
  }

  /**
   * Render method.
   *
   * @returns Component.
   */
  render () {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Form>
              <TextArea value={this.state.origin}/>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <TextArea readOnly />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

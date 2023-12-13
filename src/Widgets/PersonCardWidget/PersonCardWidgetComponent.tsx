import {
  provideComponent,
  isInPlaceEditingActive,
  WidgetTag,
  InPlaceEditingOff,
  ImageTag,
  ContentTag,
} from 'scrivito'
import { PersonCardWidget } from './PersonCardWidgetClass'
import { isPerson } from '../../Objs/Person/PersonObjClass'

provideComponent(PersonCardWidget, ({ widget }) => {
  const person = widget.get('person')
  if (!isPerson(person)) {
    if (isInPlaceEditingActive()) {
      return (
        <div className="alert alert-warning d-flex m-auto">
          <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
          <div className="my-auto mx-2">
            Please select a person in the widget properties.
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <WidgetTag className="card mb-2 bg-secondary max-width-350">
      <InPlaceEditingOff>
        <div className="card-body p-3">
          <div className="row">
            <div className="col-3 d-none d-xl-block">
              <ImageTag
                content={person}
                attribute="image"
                className="editor-img"
              />
            </div>
            <div className="col">
              <ContentTag
                content={person}
                attribute="name"
                className="h5 text-break"
              />
              <ContentTag
                content={person}
                attribute="jobTitle"
                className="text-bold opacity-60 text-extra-small text-uppercase"
              />
              <table className="table-extra-small">
                <tbody>
                  <tr>
                    <th className="align-top"><i className="bi bi-telephone"></i></th>
                    <td>
                      <a href={`tel:${person.get('telephone')}`}>
                        <ContentTag
                          content={person}
                          attribute="telephone"
                          className="text-break"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="align-top"><i className="bi bi-printer"></i></th>
                    <td>
                      <a href={`tel:${person.get('fax')}`}>
                        <ContentTag
                          content={person}
                          attribute="fax"
                          className="text-break"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="align-top"><i className="bi bi-envelope"></i></th>
                    <td>
                      <a href={`mailto:${person.get('email')}`}>
                        <ContentTag
                          content={person}
                          attribute="email"
                          className="text-break"
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </InPlaceEditingOff>
    </WidgetTag>
  )
})

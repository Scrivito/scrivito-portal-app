import {
  provideComponent,
  unstable_DamImageSelector as Unstable_DamImageSelector,
  unstable_Dam as Unstable_Dam,
} from 'scrivito'
import { Page } from './DamObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(Page, ({ page }) => (
  <>
    <h1>DamImageSelector</h1>
    <Unstable_DamImageSelector
      onSelect={(image) => console.log(image && image.id())}
    />
    <h1>Dam</h1>
    <Unstable_Dam />
  </>
))

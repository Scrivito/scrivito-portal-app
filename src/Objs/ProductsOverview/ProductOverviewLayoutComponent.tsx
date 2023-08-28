import { CurrentPage, provideLayoutComponent } from 'scrivito'
import { ProductsOverview } from './ProductsOverviewObjClass'
import { Breadcrumb } from '../../Components/Breadcrumb'

provideLayoutComponent(ProductsOverview, ({ page }) => (
  <>
    <section className="bg-light-grey py-2 hidden-xs">
      <div className="container">
        <Breadcrumb />
      </div>
    </section>
    <CurrentPage />
  </>
))

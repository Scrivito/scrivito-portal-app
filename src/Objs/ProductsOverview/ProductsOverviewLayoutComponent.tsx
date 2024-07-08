import {
  ContentTag,
  CurrentPage,
  ImageTag,
  InPlaceEditingOff,
  currentPage,
  provideLayoutComponent,
} from 'scrivito'
import { ProductsOverview } from './ProductsOverviewObjClass'
import { Breadcrumb } from '../../Components/Breadcrumb'

provideLayoutComponent(ProductsOverview, ({ page }) => (
  <>
    <section className="bg-primary py-5">
      <InPlaceEditingOff>
        <ImageTag
          content={page}
          attribute="topBannerBackground"
          className="img-background"
        />
      </InPlaceEditingOff>
      <div className="container ">
        <div className="header-caption">
          <h3 className="h3">
            <ContentTag
              content={currentPage()}
              attribute="title"
              tag="span"
              className="bg-secondary"
            />
          </h3>
        </div>
      </div>
    </section>
    <section className="bg-light-grey py-2 hidden-xs">
      <div className="container">
        <Breadcrumb />
      </div>
    </section>
    <CurrentPage />
    {!!page.get('layoutShowFooter') && (
      <ContentTag tag="footer" content={page} attribute="layoutFooter" />
    )}
  </>
))

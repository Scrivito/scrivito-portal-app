import { ContentTag, provideComponent } from 'scrivito'
import ReactMapGl, {
  Marker,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl/maplibre'
import { MapWidget } from './MapWidgetClass'
import { Pin } from './Pin'

import 'maplibre-gl/dist/maplibre-gl.css'

provideComponent(MapWidget, ({ widget }) => {
  const longitude = widget.get('longitude') ?? undefined
  const latitude = widget.get('latitude') ?? undefined
  const zoom = Number(widget.get('zoom') || '15')
  const interactive = widget.get('mapType') !== 'static'

  const key = [
    'MapWidget',
    widget.id(),
    interactive,
    latitude,
    longitude,
    zoom,
  ].join('-')

  return (
    <ReactMapGl
      key={key}
      initialViewState={{
        longitude,
        latitude,
        zoom,
        // pitch: 85,
      }}
      attributionControl={true}
      style={{ minHeight: '350px' }}
      // mapStyle="https://tiles.openfreemap.org/styles/liberty"
      // mapStyle="https://tiles.openfreemap.org/styles/positron"
      mapStyle="https://tiles.openfreemap.org/styles/bright"
      interactive={interactive}
    >
      {interactive && <NavigationControl position="top-right" />}
      <ScaleControl />

      {typeof longitude === 'number' && typeof latitude === 'number' && (
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <Pin />
        </Marker>
      )}

      {widget.get('showWidgets') && (
        <div className="p-3">
          <div className="col-3">
            <div className="card bg-white">
              <ContentTag
                content={widget}
                attribute="content"
                className="cardBody m-3"
              />
            </div>
          </div>
        </div>
      )}
    </ReactMapGl>
  )
})

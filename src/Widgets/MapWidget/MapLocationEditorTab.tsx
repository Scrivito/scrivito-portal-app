import { connect, canWrite } from 'scrivito'
import { useState } from 'react'
import { MapWidgetInstance } from './MapWidgetClass'

interface MapLocationEditorTabProps {
  widget: MapWidgetInstance
}

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
}

export const MapLocationEditorTab = connect(
  ({ widget }: MapLocationEditorTabProps) => {
    const readOnly = !canWrite()
    const location = widget.get('location') || ''
    const longitude = widget.get('longitude') || 0
    const latitude = widget.get('latitude') || 0
    const [isGeocoding, setIsGeocoding] = useState(false)
    const [geocodeError, setGeocodeError] = useState<string | null>(null)

    const handleLocationChange = (value: string) => {
      if (!readOnly) {
        widget.update({ location: value })
      }
    }

    const handleGeocodeLocation = async () => {
      if (!location || readOnly) return

      setIsGeocoding(true)
      setGeocodeError(null)

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`,
        )

        if (!response.ok) {
          throw new Error('Failed to geocode location')
        }

        const results: NominatimResult[] = await response.json()

        if (results.length === 0) {
          setGeocodeError('No results found for this location')
          return
        }

        const firstResult = results[0]!
        const lat = parseFloat(firstResult.lat)
        const lon = parseFloat(firstResult.lon)

        if (!isNaN(lat) && !isNaN(lon)) {
          widget.update({
            latitude: lat,
            longitude: lon,
          })
        } else {
          setGeocodeError('Invalid coordinates received')
        }
      } catch (error) {
        setGeocodeError(
          error instanceof Error ? error.message : 'Failed to geocode location',
        )
      } finally {
        setIsGeocoding(false)
      }
    }

    const handleLongitudeChange = (value: string) => {
      if (!readOnly) {
        const numValue = parseFloat(value)
        if (!isNaN(numValue)) {
          widget.update({ longitude: numValue })
        }
      }
    }

    const handleLatitudeChange = (value: string) => {
      if (!readOnly) {
        const numValue = parseFloat(value)
        if (!isNaN(numValue)) {
          widget.update({ latitude: numValue })
        }
      }
    }

    return (
      <div className="scrivito_detail_content">
        <div className="scrivito_detail_label">
          <span>Location</span>
        </div>
        <div className="item_content">
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              disabled={readOnly}
              placeholder="Enter location name"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGeocodeLocation}
              disabled={readOnly || !location || isGeocoding}
            >
              {isGeocoding ? 'Saving...' : 'Save'}
            </button>
          </div>
          {geocodeError && (
            <div
              className="scrivito_notice_body"
              style={{ color: 'red', marginTop: '8px' }}
            >
              <span>{geocodeError}</span>
            </div>
          )}
        </div>

        <div className="scrivito_detail_label">
          <span>Latitude</span>
        </div>
        <div className="item_content">
          <input
            type="number"
            className="form-control"
            value={latitude}
            onChange={(e) => handleLatitudeChange(e.target.value)}
            disabled={readOnly}
            placeholder="Enter latitude (-90 to 90)"
            step="any"
            min="-90"
            max="90"
          />
          <div className="scrivito_notice_body">
            <span>Enter a value between -90 and 90</span>
          </div>
        </div>

        <div className="scrivito_detail_label">
          <span>Longitude</span>
        </div>
        <div className="item_content">
          <input
            type="number"
            className="form-control"
            value={longitude}
            onChange={(e) => handleLongitudeChange(e.target.value)}
            disabled={readOnly}
            placeholder="Enter longitude (-180 to 180)"
            step="any"
            min="-180"
            max="180"
          />
          <div className="scrivito_notice_body">
            <span>Enter a value between -180 and 180</span>
          </div>
        </div>
      </div>
    )
  },
)

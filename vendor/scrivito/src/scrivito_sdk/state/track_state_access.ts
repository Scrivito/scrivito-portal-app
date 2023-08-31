import { ContextContainer } from 'scrivito_sdk/common';

type DetectorFunction = () => boolean;

export class StateReference {
  constructor(private readonly detector: DetectorFunction) {}

  /** package private: don't call this from outside the 'state' package. */
  hasChanges(): boolean {
    return this.detector();
  }
}

export interface StateAccessReport<T> {
  result: T;
  accessedState: StateReference;

  // for test purposes only
  accessCount: number;
}

/**
 * Executes the given function and tracks read access to state.
 * All state that is accessed while the function runs is considered "relevant".
 *
 * Returns a StateReference that can be used to subscribe to changes to the accessed state.
 */
export function trackStateAccess<T>(fn: () => T): StateAccessReport<T> {
  const { detector, result, accessCount } = trackChanges(fn);

  return {
    result,
    accessedState: new StateReference(detector),
    accessCount,
  };
}

const detectorRecording = new ContextContainer<DetectorFunction[]>();

export function recordDetector(detector: DetectorFunction) {
  const recording = detectorRecording.current();

  if (recording !== undefined) {
    recording.push(detector);
  }
}

function trackChanges<T>(fn: () => T) {
  const { result, detectors } = recordDetectors(fn);

  return {
    result,
    detector: () => detectors.some((detector) => detector()),
    accessCount: detectors.length,
  };
}

function recordDetectors<T>(fn: () => T): {
  result: T;
  detectors: DetectorFunction[];
} {
  const detectors: DetectorFunction[] = [];
  const result = detectorRecording.runWith(detectors, fn);

  const outerRecording = detectorRecording.current();
  if (outerRecording !== undefined) {
    detectors.forEach((detector) => outerRecording.push(detector));
  }

  return { result, detectors };
}

import { ArgumentError, isValidInteger } from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';

/** @public */
export interface ResponsiveBreakpoints {
  mobileMaxWidth: number;
  tabletMaxWidth: number;
}

const state = createStateContainer<ResponsiveBreakpoints>();

export function configureResponsiveBreakpoints(
  breakpoints: ResponsiveBreakpoints,
): void {
  validateResponsiveBreakpoints(breakpoints);
  state.set(breakpoints);
}

export function getResponsiveBreakpoints(): ResponsiveBreakpoints | undefined {
  return state.get();
}

function validateResponsiveBreakpoints({
  mobileMaxWidth,
  tabletMaxWidth,
}: ResponsiveBreakpoints) {
  if (!isValidPositiveInteger(mobileMaxWidth)) {
    throw new ArgumentError(
      "'responsiveBreakpoints.mobileMaxWidth' must be a positive integer.",
    );
  }

  if (!isValidPositiveInteger(tabletMaxWidth)) {
    throw new ArgumentError(
      "'responsiveBreakpoints.tabletMaxWidth' must be a positive integer.",
    );
  }

  if (mobileMaxWidth >= tabletMaxWidth) {
    throw new ArgumentError(
      "'responsiveBreakpoints.mobileMaxWidth' must be less than 'tabletMaxWidth'.",
    );
  }
}

function isValidPositiveInteger(value: number) {
  return isValidInteger(value) && value > 0;
}

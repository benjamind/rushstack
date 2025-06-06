// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as lodash from 'lodash';

import strings from './strings2.loc.json';

export class ChunkWithStringsClass {
  public doStuff(): void {
    // eslint-disable-next-line no-console
    console.log(lodash.escape(strings.string1));
  }
}

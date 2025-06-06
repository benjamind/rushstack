// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as path from 'path';
import { FileSystem } from '@rushstack/node-core-library';
import { CommandLineAction } from '@rushstack/ts-command-line';
import { Colorize } from '@rushstack/terminal';

import type { ApiExtractorCommandLine } from './ApiExtractorCommandLine';
import { ExtractorConfig } from '../api/ExtractorConfig';

export class InitAction extends CommandLineAction {
  public constructor(parser: ApiExtractorCommandLine) {
    super({
      actionName: 'init',
      summary: `Create an ${ExtractorConfig.FILENAME} config file`,
      documentation:
        `Use this command when setting up API Extractor for a new project.  It writes an` +
        ` ${ExtractorConfig.FILENAME} config file template with code comments that describe all the settings.` +
        ` The file will be written in the current directory.`
    });
  }

  protected override async onExecuteAsync(): Promise<void> {
    const inputFilePath: string = path.resolve(__dirname, '../schemas/api-extractor-template.json');
    const outputFilePath: string = path.resolve(ExtractorConfig.FILENAME);

    if (FileSystem.exists(outputFilePath)) {
      console.log(Colorize.red('The output file already exists:'));
      console.log('\n  ' + outputFilePath + '\n');
      throw new Error('Unable to write output file');
    }

    console.log(Colorize.green('Writing file: ') + outputFilePath);
    FileSystem.copyFile({
      sourcePath: inputFilePath,
      destinationPath: outputFilePath
    });

    console.log(
      '\nThe recommended location for this file is in the project\'s "config" subfolder,\n' +
        'or else in the top-level folder with package.json.'
    );
  }
}

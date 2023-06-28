import { AppService } from './app.service';
import { Controller, Get, Post,Put, Body, Param, Res,Patch } from '@nestjs/common';
import { Response } from 'express';

@Controller('xml-js')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(':filename')//newtesting11
  async createXmlFile(@Param('filename') filename: string, @Body() inputData: any) {
    return this.appService.createXmlFile_xmljs(filename, inputData);
  }
 
  //** *********/

  @Post('/json/:filename')//jsontoxml
  async createXmlFilejson(@Param('filename') filename: string, @Body() inputData: any) {
    return this.appService.createXmlFile_json(filename, inputData);
  }
  
    @Get(':filename')
  async getXmlFile(@Param('filename') filename: string, @Res() res: Response) {
    const data = await this.appService.getXmlFile_xmljs(filename);
    res.setHeader('Content-Type', 'application/xml');
    res.send(data);
  }  

  // @Get('/xml-files')
  // async getAllXmlFiles() {
  //   return this.appService.getAllXmlFiles();
  // }

  @Put(':filename')//http://localhost:5000/api/xml-js/newcode 
  //working in case of root elements ====updatings values and childkey not the parant
async updateXmlFile(@Param('filename') filename: string, @Body() inputData: any) {
  return this.appService.updateXmlFile_xmljs(filename, inputData);
} 

@Put('/keyvalue/:filename') //http://localhost:5000/api/xml-js/keyvalue/filename ====working in case of updating both key as well as values but issue for root element not working in that case 
// working in case of bpmn file updating keys as well as values
async updatekeyvalue(@Param('filename') filename: string, @Body() inputData: any) {
  return this.appService.updateXmlFile_xmljs1(filename, inputData);
} 

/* @Put('edit-word')
async editWord(@Body() data: { filePath: string, oldWord: string, newWord: string }, @Res() res) {
  try {
  await this.appService.editWord(data.filePath, data.oldWord, data.newWord);
  return res.send({ message: 'Word edited successfully' });
} catch (err) {
  return res.send({ message: 'Word edit failed', error: err.message });
} 
}*/

}


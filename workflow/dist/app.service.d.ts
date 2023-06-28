interface XmlData {
    [key: string]: any;
}
export declare class AppService {
    createXmlFile_xmljs(filename: string, inputData: any): Promise<{
        message: string;
        data: string;
    }>;
    getXmlFile_xmljs(filename: string): Promise<Buffer>;
    updateXmlFile_xmljs(filename: string, inputData: XmlData): Promise<{
        message: string;
        data: string;
    }>;
    updateXmlFile_xmljs1(filename: string, inputData: XmlData): Promise<{
        message: string;
        data: string;
    }>;
    createXmlFile_json(filename: string, inputData: any): Promise<{
        message: string;
        data: string;
    }>;
}
export {};

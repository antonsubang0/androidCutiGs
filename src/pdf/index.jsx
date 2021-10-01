import { FileSharer } from '@byteowls/capacitor-filesharer';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./v_font";
pdfMake.vfs = pdfFonts;

const pdf = (data) => {
    const dd = {
        pageSize: {
            width: 300,
            height: 350
        },
        watermark: { text: 'ACPIGS', color: 'blue', opacity: 0.2, bold: true, italics: true, fontSize: 50, angle: -30 },
        footer: {
            columns: [
            { text: '@cahMagetan', alignment: 'right', opacity: 0.5, fontSize : 10, margin :[0,15,15,0] }
            ]
        },
        content: [
            { text: 'PT. Agape Diah Persada', decoration:'underline', fontSize: 12, alignment: 'center', margin:[0,0,0,0]},
            { text: 'Form Cuti', fontSize: 12, alignment: 'center', margin : [0,0,0,20] },
            {
                columns: [
                    { text: `UID`, fontSize: 10, width: '25%' },
                    { text: `:`, fontSize: 10, width: '5%' },
                    { text: data.uid, fontSize: 10 },
    
                ]
            },
            {
                columns: [
                    { text: `Nama`, fontSize: 10, width: '25%' },
                    { text: `:`, fontSize: 10, width: '5%' },
                    { text: data.nama, fontSize: 10 },
                ]
            },
            {
                columns: [
                    { text: `Bagian`, fontSize: 10, width: '25%' },
                    { text: `:`, fontSize: 10, width: '5%' },
                    { text: data.bagian, fontSize: 10 },
                ]
            },
            {
                columns: [
                    { text: `Cuti Ke`, fontSize: 10, width: '25%' },
                    { text: `:`, fontSize: 10, width: '5%' },
                    { text: data.cuti, fontSize: 10 },
                ]
            },
            {
                columns: [
                    { text: `Tgl Cuti`, fontSize: 10, width: '25%' },
                    { text: `:`, fontSize: 10, width: '5%' },
                    { text: data.dateStr, fontSize: 10 },
                ]
            },
            {
                columns: [
                    { text: `Keperluan`, fontSize: 10, width: '25%' },
                    { text: `:`, fontSize: 10, width: '5%' },
                    { text: data.keperluan, fontSize: 10 },
                ]
            },
            {
                columns: [
                    { text: `Sisa Cuti`, fontSize: 10, width: '25%', margin: [0,10,0,0] },
                    { text: `:`, fontSize: 10, width: '5%', margin: [0,10,0,0] },
                    { text: 12 - data.cuti, fontSize: 10, margin: [0,10,0,0] },
                ]
            },
            { text: 'Diketahui dan Disetujui', decoration:'underline', fontSize: 10, alignment: 'center', margin:[0,30,0,5]},
            { qr: data.date.toString(), fit : 50, alignment: 'center', margin:[0,0,0,5]},
            { text: 'Korlap', fontSize: 10, alignment: 'center', margin:[0,0,0,0]},
            
        ]
        
    }
    // pdfMake.createPdf(dd).download();
    pdfMake.createPdf(dd).getBase64(async (datapdf) => {
        const datex = new Date();
        FileSharer.share({
          filename: `Cuti-${datex.toLocaleDateString('id-ID').split('/').join('-')}.pdf`,
          base64Data: datapdf,
          contentType: "application/pdf",
        })
      });
}
export { pdf };
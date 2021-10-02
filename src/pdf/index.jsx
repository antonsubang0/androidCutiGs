import { FileSharer } from '@byteowls/capacitor-filesharer';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./v_font";
pdfMake.vfs = pdfFonts;

const Logo = 'data:image/jpeg;base64,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';

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
            {
                columns: [
                    {
                        image: Logo,
                        width: 40,
                        height: 40,
                        margin : [0,-10,0,0]
                    },
                    { text: 'PT. AGAPE DIAH PERSADA', decoration:'underline', fontSize: 12, alignment: 'center', margin:[0,0,0,0]},
                ]
            },
            {
                columns:[
                    {
                        text:'',
                        width: 40,
                    },
                    { text: 'Pengajuan Cuti', fontSize: 12, alignment: 'center', margin : [0,-15,0,20] },
                ]
            },
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
          filename: `Cuti-${data.nama}-${datex.toLocaleDateString('id-ID').split('/').join('-')}.pdf`,
          base64Data: datapdf,
          contentType: "application/pdf",
        })
    });
}

const pdfKaryawan = (data1) => {
    let tabel1 = [
        [
            { text: 'No', bold: true, alignment: 'center', margin :[0,0,0,0]}, 
            { text: 'UID', bold: true, alignment: 'center', margin :[0,0,0,0]},
            { text: 'Nama', bold: true, alignment: 'center', margin :[0,0,0,0]},
            { text: 'Bagian', bold: true, alignment: 'center', margin :[0,0,0,0]},
            { text: 'Jumlah Cuti', bold: true, alignment: 'center', margin :[0,0,0,0]}
        ]
    ];
    data1.map((data, index) => {
        tabel1.push([
            { text: index + 1, alignment: 'center'}, 
            { text: data.uid, alignment: 'center'},
            { text: data.nama },
            { text: data.bagian, alignment: 'center'},
            { text: data.cuti, alignment: 'center'}
        ]);
    });
    const dd = {
        watermark: { text: 'ACPIGS', color: 'blue', opacity: 0.2, bold: true, italics: true, fontSize: 50, angle: -30 },
        footer: {
            columns: [
            { text: '@cahMagetan', alignment: 'right', opacity: 0.5, fontSize : 10, margin :[0,15,15,0] }
            ]
        },
        content: [
            {
                columns: [
                    {
                        image: Logo,
                        width: 70,
                        height: 70,
                        margin : [0,-15,0,0]
                    },
                    { text: 'PT. AGAPE DIAH PERSADA', decoration:'underline', fontSize: 22, alignment: 'center', margin:[0,0,0,0]},
                ]
            },
            {
                columns:[
                    {
                        text:'',
                        width: 40,
                    },
                    { text: 'Daftar Status Cuti Karyawan', fontSize: 14, alignment: 'center', margin : [0,-25,0,40] },
                ]
            },
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [ '10%', '15%', '35%', '25%', '15%' ],
            
                    body: tabel1
                }
            }
        ]
        
    }
    // pdfMake.createPdf(dd).download();
    pdfMake.createPdf(dd).getBase64(async (datapdf) => {
        const datex = new Date();
        FileSharer.share({
          filename: `Status-Cuti-${datex.toLocaleDateString('id-ID').split('/').join('-')}.pdf`,
          base64Data: datapdf,
          contentType: "application/pdf",
        })
    });
}

const pdfCutii = (data2) => {
    let datax1 = data2.sort((a, b)=>{ 
        if (a.bagian < b.bagian){ return -1 } else if (a.bagian > b.bagian){ return +1 } else { return 0 }
    });
    let datax2 = datax1.sort((a, b)=>{ 
        if (a.bagian === b.bagian) {
          if (a.nama < b.nama){ return -1 } else if (a.nama > b.nama){ return +1 } else { return 0 }
        }
    });
    let datax3 = datax2.sort((a, b)=>{ 
        if (a.nama === b.nama) {
          if (a.cuti < b.cuti){ return -1 } else if (a.cuti > b.cuti){ return +1 } else { return 0 }
        }
    });
    let tabel1 = [
        [
            { text: 'No', bold: true, alignment: 'center', margin :[0,0,0,0]}, 
            { text: 'UID', bold: true, alignment: 'center', margin :[0,0,0,0]},
            { text: 'Nama', bold: true, alignment: 'center', margin :[0,0,0,0]},
            { text: 'Bagian', bold: true, alignment: 'center', margin :[0,0,0,0]},
            { text: 'Cuti', bold: true, alignment: 'center', margin :[0,0,0,0]},
            { text: 'Tanggal', bold: true, alignment: 'center', margin :[0,0,0,0]}
        ]
    ];
    datax3.map((data, index) => {
        tabel1.push([
            { text: index + 1, fontSize:10, alignment: 'center'}, 
            { text: data.uid, fontSize:10, alignment: 'center'},
            { text: data.nama, fontSize: 10 },
            { text: data.bagian, fontSize:10, alignment: 'center'},
            { text: data.cuti, fontSize:10, alignment: 'center'},
            { text: data.dateStr, fontSize:10, alignment: 'center'}
        ]);
    });
    const dd = {
        watermark: { text: 'ACPIGS', color: 'blue', opacity: 0.2, bold: true, italics: true, fontSize: 50, angle: -30 },
        footer: {
            columns: [
            { text: '@cahMagetan', alignment: 'right', opacity: 0.5, fontSize : 10, margin :[0,15,15,0] }
            ]
        },
        content: [
            {
                columns: [
                    {
                        image: Logo,
                        width: 70,
                        height: 70,
                        margin : [0,-15,0,0]
                    },
                    { text: 'PT. AGAPE DIAH PERSADA', decoration:'underline', fontSize: 22, alignment: 'center', margin:[0,0,0,0]},
                ]
            },
            {
                columns:[
                    {
                        text:'',
                        width: 40,
                    },
                    { text: 'Daftar Status Cuti Karyawan', fontSize: 14, alignment: 'center', margin : [0,-25,0,40] },
                ]
            },
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [ '5%', '15%', '28%', '25%', '10%', '17%' ],
            
                    body: tabel1
                }
            }
        ]
        
    }
    // pdfMake.createPdf(dd).download();
    pdfMake.createPdf(dd).getBase64(async (datapdf) => {
        const datex = new Date();
        FileSharer.share({
          filename: `Rekap-Cuti-${datex.toLocaleDateString('id-ID').split('/').join('-')}.pdf`,
          base64Data: datapdf,
          contentType: "application/pdf",
        })
    });
}
export { pdf, pdfKaryawan, pdfCutii };
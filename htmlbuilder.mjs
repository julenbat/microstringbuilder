#! /root/.nvm/versions/node/v21.4.0/bin/node


import fs from 'node:fs'
import process from 'node:process'
import * as Langfile from './lang.js'


const fileName = process.argv[2];

if(process.argc <= 3  || !fileName){
	console.error("filename to parse must be given as cmd argument")
	process.exit(-1)
}

const htmlFile = fs.readFileSync("./" + fileName , "UTF-8")
let lang = ""


for (const _lang in Langfile.default.languages ){
	lang = _lang
	const newFileName = get_lang_filename()
	if(fs.existsSync(newFileName)) fs.unlinkSync(newFileName)


	const newFile = fs.createWriteStream( newFileName, {flags: "ax", encoding: "utf-8"})
	const htmlLines = htmlFile.split("\n")

	htmlLines.forEach((line,n) => {


		 const reg = new RegExp(/(?<=ñ)[a-zA-Z\.0-9]+(?=ñ)/gm)
		 const matches =  [...line.matchAll(reg)]
 
		 for(const match of matches){
			const m = match[0]
			line = replacer(m, line)
		}

 
		 newFile.write(line + '\n', "utf-8"); 

	})

	newFile.close()
}

function get_lang_filename()
{
	return fileName.replace(".html", `_${lang}.html`)
}

function replacer(txt, line){
	const langTranslations = Langfile.default.languages[lang];
	const v = exists_in_langfile(txt)

	return line.replace( 'ñ' + txt + 'ñ', v)
}

function exists_in_langfile(keyword){
	const l = Langfile.default.languages[lang]

	const keys = keyword.split(".")
	let cur = l

	keys.forEach((k) => {
		if (!(k in cur)){
			console.log(`${k} not in {cur}`);
			process.exit();
		}
		cur = cur[k]
	})

	return cur;
}

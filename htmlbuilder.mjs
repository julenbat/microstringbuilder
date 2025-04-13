#! /root/.nvm/versions/node/v21.4.0/bin/node

/**
* Errores conocidos que me da pereza corregir aunque sean una tonteria:
* 1. Añade al fichero seleccionado toda la traducción, es decir, si ejecutas la script 2 veces sobre el mismo fichero
* hará append a todo
* 2. No se puede usar la ñ  :( muy eennne por mi parte
*
*/
import fs from 'node:fs'
import process from 'node:process'
import * as Langfile from './lang.js'


const fileName = process.argv[2];
const lang = process.argv[3];
const newFileName = get_lang_filename()

const htmlFile = fs.readFileSync("./" + fileName , "UTF-8")
const newFile = fs.openSync( newFileName, "a+")
const htmlLines = htmlFile.split("\n")

htmlLines.forEach((line,n) => {


 const reg = new RegExp(/(?<=ñ)[a-zA-Z\.0-9]+(?=ñ)/gm)
 const matches =  [...line.matchAll(reg)]
 
 for(const match of matches){
	const m = match[0]
	line = replacer(m, line)
 }

 
 fs.writeSync(newFile, line + '\n'); 


})

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

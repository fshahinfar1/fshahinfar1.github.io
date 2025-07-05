default:
	make4ht -s --output-dir build blog;
	bibtex blog;
	make4ht -s --output-dir build blog;
	rm *.4ct *.4tc *.aux *.bbl *.bcf *.blg *.css *.dvi *.html *.idv *.lg *.log *.run.xml *.tmp *.xref

clean:
	rm -r build
	rm *.4ct *.4tc *.aux *.bbl *.bcf *.blg *.css *.dvi *.html *.idv *.lg *.log *.run.xml *.tmp *.xref


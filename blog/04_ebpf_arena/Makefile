default:
	make4ht --output-dir build blog;
	bibtex blog;
	make4ht --output-dir build blog;

clean:
	rm -r build
	rm *.4ct *.4tc *.aux *.bbl *.bcf *.blg *.css *.dvi *.html *.idv *.lg *.log *.run.xml *.tmp *.xref

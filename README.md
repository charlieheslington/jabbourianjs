# Jabbourian.JS

## General info
Checks sections of writing against rules from the ACE writing guide. Please excuse this readme's Jabbourian.

This checker currently checks text against 8 rules and 2 warnings from the ACE Writing Guide and can take .docx files as an input.

## Technologies
* JavaScript
* Bootstrap
* Mammoth.JS

## Setup
To use Jabbourian.JS - first, you will need to clone the repositary.

    git clone https://github.com/charlieheslington/jabbourianjs.git

Once cloned, naviagte to index.html in a Web Browser.

## Features
This checker checks against the following rules of the ACE Writing Guide
* Avoid adjectives that end with ly. For that matter, avoid adjectives altogether
* Avoid use of -ing words
* Avoid using quotation marks. Use your own words to cite a reference
* Do not end a sentence with a preposition
* Do not start a sentence with the words 'and', 'but' or 'because'
* Avoid statements with sweeping categorical adverbs like 'always', 'never', 'any', 'every', 'all' and 'none'.They may undermine the credibility of an entire report if a reader can disprove one of them
* Avoid weak verbs 'be', 'have', 'can, or 'do'. Use verbs that describestate and action
* Do not use 'could', 'would', or 'should' .Use 'must' or 'shall' to describe a requirement
* Note that 'no' equals zero, and that zero is singular. 'No computer left behind' is correct. 'No computers left behind' is incorrect
* Use quantitative adverbs like 'few', 'some', 'many',and 'most' with care. They refer to plurality any way you count them. 'Most' equals at least 50 percent

This version can also take an uploaded .docx file and analyse structure and Jabbourian. Files should adhere to the template or use Heading 1 Attrbutes for document section titles. The .docx analyser checks for the following sections within a document:

* Executive Summary
* Problem Statement
* Background
* Assumptions
* Techniques and Tools
* Problem Solution
* Risk Assessment
* References

## Scoring
This feature checker implements a scoring system that tries to replicate how graders grade an essay. It is a weighted system that caps the errors at a certain number based on the total number of sentences. Certain errors, such as weak verbs, are weighed much more severly than other errors. The exact numbers were determined by taking a few graded essays and adjusting the constants until the output matched the Jabbour score of the essays. 

We use the following process to score the essays. The program loops through the paragraphs and calculates a jabbour score for each of the paragraphs. It then returns the paragraph's jabbour score. We then average each paragraph weighted on how long the paragraph is in relation to the total essay. This way short paragraphs that have perfect jabbour do not out weigh long paragraphs with poor jabbour. This also ensures that the DOCX and text analyzing both return the same scores. 

## Status
Project is: _in progress_

## Inspiration
Writing big long essays and realising there could be a systematic solution to my pain.

## Contact
Created by:
[@charlieheslington](https://github.com/charlieheslington) - charlie.hesli@gmail.com 
with
[@ColinBoerger](https://github.com/ColinBoerger) - colin.h.s.boerger@gmail.com 

- feel free to contact us!

<p align="center"><img src="https://i.ibb.co/0DtDN9r/MOSHED-2020-2-10-13-44-27.jpg" width="200px" height="100px"></img> <img src="https://www.pngkey.com/png/full/200-2000202_american-flag-pixelated-us-flag-pixel-art.png" width="200px" height="100px"></img></p>
Lovingly made in UK / Plymouth, MA (Home of the American Revolution)

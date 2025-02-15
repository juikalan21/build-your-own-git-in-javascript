# Git Implementation Documentation

## Overview
This document explains the implementation of basic Git functionality, focusing on three core object types: blobs, trees, and commits.

## Git Object Structure
Git objects are stored in `.git/objects` directory with the following characteristics:
- Blobs store actual file data changes
- Each object is stored in a separate file
- File naming: first 2 characters of hash form directory name, remaining characters form filename

## Git Directory Structure
```
.git/
├── config          # Repository configuration
├── HEAD           # Points to current branch
├── hooks/         # Pre/post action scripts
│   └── prepare-commit-msg.sample
├── objects/       # Git objects storage
│   ├── info/
│   └── pack/
└── refs/          # References and tags
    ├── heads/
    └── tags/
```

## Key Components

### Config File
- Contains repository configuration
- Stores settings like author, filemode
- Includes branch information

### HEAD File
- Tracks current branch
- Viewable via `cat HEAD`

### Objects Directory
- Stores Git objects (commits, blobs)
- Uses hash-based organization
- Example: hash `1234567890` stored as `12/34567890`

## Implementation Details

### Reading Objects (cat-file)
To implement `cat-file`:
1. Read blob object from `.git/objects`
2. Decompress using Zlib
3. Extract content from decompressed data
4. Print to stdout

### Creating Objects (hash-object)
Blob object structure:
```
blob <size>\0<content>
```
where:
- `<size>`: content size in bytes
- `\0`: null byte
- `<content>`: file content

Implementation steps:
1. Accept filepath input
2. Calculate SHA hash
3. If `-w` flag present:
   - Create directory using first 2 hash chars
   - Write remaining chars as filename
4. Output 40-character SHA hash


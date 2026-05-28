function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {

    class TrieNode {
        children: Map<string, TrieNode> = new Map();
        idx: number = -1;
    }

    const root = new TrieNode();

    
    function update(node: TrieNode, i: number) {
        if (
            node.idx === -1 ||
            wordsContainer[i].length < wordsContainer[node.idx].length ||
            (
                wordsContainer[i].length === wordsContainer[node.idx].length &&
                i < node.idx
            )
        ) {
            node.idx = i;
        }
    }

    for (let i = 0; i < wordsContainer.length; i++) {
        let node = root;
        update(node, i);

        const word = wordsContainer[i];

        for (let j = word.length - 1; j >= 0; j--) {
            const ch = word[j];

            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode());
            }

            node = node.children.get(ch)!;
            update(node, i);
        }
    }

    const ans: number[] = [];

    for (const word of wordsQuery) {
        let node = root;

        for (let j = word.length - 1; j >= 0; j--) {
            const ch = word[j];

            if (!node.children.has(ch)) break;
            node = node.children.get(ch)!;
        }

        ans.push(node.idx);
    }

    return ans;
}
function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k === 0) return head;

  
    let length = 1;
    let tail = head;

    while (tail.next) {
        tail = tail.next;
        length++;
    }

   
    k = k % length;
    if (k === 0) return head;

    
    tail.next = head;

  
    let stepsToNewTail = length - k;
    let newTail = head;

    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next!;
    }

   
    let newHead = newTail.next;

    
    newTail.next = null;

    return newHead;
}
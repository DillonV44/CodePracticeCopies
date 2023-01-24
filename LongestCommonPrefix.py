class Solution(object):
    def longestCommonPrefix(self, strs):
        min_length = min([len(s) for s in strs])
        if min_length == 0: return ''
        longest_prefix = ''
        for i in range(1, min_length+1):
            prefix = strs[0][:i]
            for s in strs:
                if s[:i] != prefix: return longest_prefix
            if len(longest_prefix) < len(prefix):
                longest_prefix = prefix
        return longest_prefix


s = Solution()
print(s.longestCommonPrefix(["flower", "flow", "flight"]))
print(s.longestCommonPrefix(["dog", "racecar", "car"]))
#include <iostream>
#include <map>
#include <unordered_map>
#include <algorithm>
#include <cmath>
#include <cstring>
#include <stack>
#include <queue>
#include <vector>
#include <limits>
using namespace std;

typedef long long ll;

unordered_map<char, int> mp1;
unordered_map<char, int> mp2;

int main() {
  ios_base::sync_with_stdio(false);
  string s;
  ll res = 0;
  while(cin >> s) {
    int mid = s.size() / 2;
    for(int i = 0; i <= mid - 1; i++) {
      if(!mp1[s[i]]) {
        mp1[s[i]] = 1;
      } else {
        mp1[s[i]]++;
      }

      if(!mp2[s[mid + i]]) {
        mp2[s[mid + i]] = 1;
      } else {
        mp2[s[mid + i]]++;
      }
    }

    for(auto it1: mp1) {
      // cout << it1.first << ' ' << it1.second << '\n';
      if(mp2[it1.first]) {
        // cout << it1.first << ' ' << _min << '\n';
        res += abs((ll) it1.first - (isupper(it1.first) ? 65 - 27 : 96));
        it1.second--;
        mp2[it1.first]--;
      }
    }

    // cout << '\n';

    // for(auto it2: mp2) {
    //   cout << it2.first << ' ' << it2.second << '\n';
    // }
    mp1.clear();
    mp2.clear();
  }
  cout << res;
  return 0;
}
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

unordered_map<char, bool> mp[3];

int main() {
  ios_base::sync_with_stdio(false);
  string s;
  ll res = 0;
  int idx = 0;
  while(cin >> s) {
    for(int i = 0; i <= s.size() - 1; i++) {
      if(!mp[idx][s[i]]) mp[idx][s[i]] = true;
    }

    if(idx == 2) {
      for(auto it: mp[0]) {
        if(mp[1][it.first] && mp[2][it.first]) {
          // cout << it.first << ' ' << it.second << '\n';
          res += abs((ll) it.first - (isupper(it.first) ? 65 - 27 : 96));
        }
      }
      for(int i = 0; i <= idx; i++) {
        mp[i].clear();
      }
      idx = 0;
    } else {
      idx++;
    }
  }
  cout << res;
  return 0;
}
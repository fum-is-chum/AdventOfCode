#include <iostream>
#include <vector>
#include <unordered_map>
#include <fstream>
#include <istream>
#include <string>
using namespace std;

unordered_map<char, vector<string>> firstCharMap = {
    {'o', {"one"}},
    {'t', {"two", "three"}},
    {'f', {"four", "five"}},
    {'s', {"six", "seven"}},
    {'e', {"eight"}},
    {'n', {"nine"}},
    {'z', {"zero"}},
};

unordered_map<string, char> strToIntStr = {
    {"one", '1'},
    {"two", '2'},
    {"three", '3'},
    {"four", '4'},
    {"five", '5'},
    {"six", '6'},
    {"seven", '7'},
    {"eight", '8'},
    {"nine", '9'},
    {"zero", '0'}};

vector<string> readFile(string path)
{
    vector<string> lines;
    string line;
    ifstream file(path);

    if (file.is_open())
    {
        while (getline(file, line))
        {
            lines.push_back(line);
        }
        file.close();
    }
    else
    {
        cout << "Unable to open file";
    }

    return lines;
}

pair<char, int> findFirstInt(string line, bool asc = true)
{
    int start = asc ? 0 : line.length() - 1;
    int end = asc ? line.length() : -1;
    int dir = asc ? 1 : -1;
    for (int i = start; asc ? i < end : i >= end; i += dir)
    {
        if (line[i] >= '0' && line[i] <= '9')
        {
            return pair<char, int>(line[i], i);
        }
    }
    return pair<char, int>('0', -1);
}

pair<char, int> findFirstIntFromWord(string line, bool asc = true)
{
    int start = asc ? 0 : line.length() - 1;
    int end = asc ? line.length() : -1;
    int dir = asc ? 1 : -1;
    for (int i = start; asc ? i < end : i >= end; i += dir)
    {
        char chr = line[i];
        if (firstCharMap.count(chr) > 0)
        {
            vector<string> words = firstCharMap[chr];
            for (int j = 0; j < words.size(); j++)
            {
                string word = words[j];
                if (line.substr(i, word.length()) == word)
                {
                    return pair<char, int>(strToIntStr[word], i + word.length() - 1);
                }
            }
        }
    }
    return pair<char, int>('0', -1);
}

int main()
{
    vector<string> lines = readFile("input.txt");
    int sum = 0;
    for (int i = 0; i < lines.size(); i++)
    {
        string line = lines[i];
        pair<char, int> digits[2];
        pair<char, int> digitsFromWord[2];
        digits[0] = findFirstInt(line);
        digits[1] = findFirstInt(line, false);
        digitsFromWord[0] = findFirstIntFromWord(line);
        digitsFromWord[1] = findFirstIntFromWord(line, false);

        char numberDigits[3];
        // compare position
        numberDigits[0] = (digits[0].second != -1 && (digitsFromWord[0].second == -1 || digits[0].second < digitsFromWord[0].second)) ? digits[0].first : digitsFromWord[0].first;
        numberDigits[1] = (digits[1].second != -1 && (digitsFromWord[1].second == -1 || digits[1].second > digitsFromWord[1].second)) ? digits[1].first : digitsFromWord[1].first;
        numberDigits[2] = '\0'; // Add the null character at the end

        int number = atoi(numberDigits);
        // cout << digits[0].first << digits[1].first << ' ' << digitsFromWord[0].first << digitsFromWord[1].first << ' ' << number << '\n';
        sum += number;
    }
    cout << sum << '\n';
    return 0;
}
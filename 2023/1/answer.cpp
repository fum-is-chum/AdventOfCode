#include <iostream>
#include <fstream>
#include <vector>
#include <istream>
#include <string>
using namespace std;

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

char findFirstInt(string line, bool asc = true)
{
    int start = asc ? 0 : line.length() - 1;
    int end = asc ? line.length() : -1;
    int dir = asc ? 1 : -1;
    for (int i = start; asc ? i < end : i >= end; i += dir)
    {
        if (line[i] >= '0' && line[i] <= '9')
        {
            return line[i];
        }
    }
    return '0';
}

int main()
{
    vector<string> lines = readFile("input.txt");
    int sum = 0;
    for (int i = 0; i < lines.size(); i++)
    {
        char digits[2];
        digits[0] = findFirstInt(lines[i]);
        digits[1] = findFirstInt(lines[i], false);
        int number = atoi(digits);
        cout << number << '\n';
        sum += number;
    }

    cout << sum << '\n';
    return 0;
}